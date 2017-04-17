'use strict';

/**
 * Merkle tree implementation in JavaScript with Blake2s hash
 *
 * Mykola Bubelich ( https://bubelich.com )
 * 2017-04-17
 *
 * CryptoEsel ( https://cryptoesel.com )
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsBlake2s = require('js-blake2s');

var _jsBlake2s2 = _interopRequireDefault(_jsBlake2s);

var _jsHexi = require('js-hexi');

var _jsHexi2 = _interopRequireDefault(_jsHexi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const Blake2s = require('js-blake2s')
// const Hexi = require('js-hexi')

var MerkleTree = function () {
  /**
   *
   * @param {[Uint8Array]} hashes
   */
  function MerkleTree(hashes) {
    _classCallCheck(this, MerkleTree);

    // this.level = 0;
    // this.stage = [];
    this.state = {
      elements: hashes.length,
      hashes: [],
      deep: 0,
      stage: [],
      root: null
    };

    this._init(hashes);
  }

  /**
   *
   */


  _createClass(MerkleTree, [{
    key: 'build',
    value: function build() {
      var stage = this.state.stage[this.state.deep - 1];

      // if found all leafs //
      if (stage.length === 1) {
        this._constructTree();
        return this.state;
      }

      // console.log('last stage length', stage.length);

      var index = 0;
      var tree = { root: null, left: null, right: null };
      this.state.stage[this.state.deep] = [];

      for (index; index < stage.length; index++) {
        var hash = stage[index].root;

        if (index % 2 === 0) {
          tree.left = hash;
        } else {
          tree.right = hash;

          // compute root //
          tree.root = _jsHexi2.default.toBase16(MerkleTree._hash(_jsHexi2.default.fromBase16(tree.left + tree.right)));
          this.state.stage[this.state.deep].push(Object.assign({}, tree));

          // clean
          tree.left = tree.right = tree.root = null;
        }
      }

      if (index % 2 !== 0) {
        tree.root = tree.left;
        this.state.stage[this.state.deep].push(Object.assign({}, tree));
      }

      // update deep //
      this.state.deep++;

      return this.build();
    }

    /**
     *
     * @param {[Uint8Array]} hashes
     * @private
     */

  }, {
    key: '_init',
    value: function _init(hashes) {
      var index = 0;
      var stage = [];
      var tree = { root: null, left: null, right: null };

      for (index = 0; index < hashes.length; index++) {
        var hash = _jsHexi2.default.toBase16(hashes[index]);
        this.state.hashes[index] = hash;

        if (index % 2 === 0) {
          tree.left = hash;
        } else {
          tree.right = hash;
          tree.root = _jsHexi2.default.toBase16(MerkleTree._hash(_jsHexi2.default.fromBase16(tree.left + tree.right)));

          // copy to stage //
          stage.push(Object.assign({}, tree));

          // clean //
          tree.left = null;
          tree.right = null;
          tree.root = null;
        }
      }

      if (index % 2 !== 0) {
        tree.root = tree.left;
        stage.push(Object.assign({}, tree));
      }

      this.state.stage[0] = stage;
      this.state.deep++;
    }

    /**
     *
     * @private
     */

  }, {
    key: '_constructTree',
    value: function _constructTree() {
      /** @type {[]} stage **/
      var stage = this.state.stage;

      stage.reverse();

      this.state.root = stage[0][0].root;
    }

    /**
     * Blake2s hash function
     *
     * @param {Uint8Array} data
     * @return {Uint8Array}
     * @private
     */

  }], [{
    key: '_hash',
    value: function _hash(data) {
      return new _jsBlake2s2.default().update(data).digest();
    }
  }]);

  return MerkleTree;
}();

if (typeof module !== 'undefined') {
  module.exports = MerkleTree;
}
