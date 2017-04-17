'use strict'

/**
 * Merkle tree implementation in JavaScript with Blake2s hash
 *
 * Mykola Bubelich ( https://bubelich.com )
 * 2017-04-17
 *
 * CryptoEsel ( https://cryptoesel.com )
 *
 */

import Blake2s from 'js-blake2s'
import Hexi from 'js-hexi'

class MerkleTree {
  /**
   *
   * @param {[Uint8Array]} hashes
   */
  constructor (hashes) {
    this.state = {
      elements: hashes.length,
      hashes: [],
      deep: 0,
      stage: [],
      root: null
    }

    this._init(hashes)
  }

  /**
   *
   */
  build () {
    const stage = this.state.stage[this.state.deep - 1]

    // if found all leafs //
    if (stage.length === 1) {
      this._constructTree()
      return this.state
    }

    // console.log('last stage length', stage.length);

    let index = 0
    const tree = {root: null, left: null, right: null}
    this.state.stage[this.state.deep] = []

    for (index; index < stage.length; index++) {
      const hash = stage[index].root

      if (index % 2 === 0) {
        tree.left = hash
      } else {
        tree.right = hash

        // compute root //
        tree.root = Hexi.toBase16(MerkleTree._hash(Hexi.fromBase16(tree.left + tree.right)))
        this.state.stage[this.state.deep].push(Object.assign({}, tree))

        // clean
        tree.left = tree.right = tree.root = null
      }
    }

    if (index % 2 !== 0) {
      tree.root = tree.left
      this.state.stage[this.state.deep].push(Object.assign({}, tree))
    }

    // update deep //
    this.state.deep++

    return this.build()
  }

  /**
   *
   * @param {[Uint8Array]} hashes
   * @private
   */
  _init (hashes) {
    let index = 0
    const stage = []
    const tree = {root: null, left: null, right: null}

    for (index = 0; index < hashes.length; index++) {
      const hash = Hexi.toBase16(hashes[index])
      this.state.hashes[index] = hash

      if (index % 2 === 0) {
        tree.left = hash
      } else {
        tree.right = hash
        tree.root = Hexi.toBase16(MerkleTree._hash(Hexi.fromBase16(tree.left + tree.right)))

        // copy to stage //
        stage.push(Object.assign({}, tree))

        // clean //
        tree.left = null
        tree.right = null
        tree.root = null
      }
    }

    if (index % 2 !== 0) {
      tree.root = tree.left
      stage.push(Object.assign({}, tree))
    }

    this.state.stage[0] = stage
    this.state.deep++
  }

  /**
   *
   * @private
   */
  _constructTree () {
    /** @type {[]} stage **/
    let stage = this.state.stage

    stage.reverse()

    this.state.root = stage[0][0].root
  }

  /**
   * Blake2s hash function
   *
   * @param {Uint8Array} data
   * @return {Uint8Array}
   * @private
   */
  static _hash (data) {
    return new Blake2s().update(data).digest()
  }
}

if (typeof module !== 'undefined') {
  module.exports = MerkleTree
}
