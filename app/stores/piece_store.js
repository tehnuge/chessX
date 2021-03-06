import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/dispatcher.js';
import PieceConstants from '../constants/piece_constants';

var _pieces = {};
var _grid = [];
var _reserved = [];
var _gameId;

var _error = null;
var CHANGE_EVENT = 'change';

function _setState(state) {
  _gameId = state.gameId;
  _pieces = state.pieces || {};
  _grid = state.grid || [];
  _reserved = state.reserved || [];
}

function _removeState() {
  _gameId = undefined;
  _pieces = {};
  _grid = [];
  _reserved = [];
}

function _setError(error) {
  _error = error;
}

function _clearError() {
  _error = null;
}

class PieceStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  get() {
    return {pieces: _pieces, grid: _grid, gameId: _gameId, reserved: _reserved};
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  dispatcherCallback(payload) {
    switch(payload.actionType) {
      case PieceConstants.STATE_RECEIVED:
        _setState(payload);
        break;
      case PieceConstants.ERROR_RECEIVED:
        _setError(payload.error);
        break;
      case PieceConstants.STATE_REMOVED:
        _removeState();
        break;
    }
    this.emitChange();
  }
}

export default new PieceStore();
