import test from 'tape'
import MerkleTree from '../js-merkletree';
import Blake2s from 'js-blake2s';
import hexi from 'js-hexi';

/**
 * General Test
 */
test("Class 'X25519' should exists", tape => {
  'use strict'

  const mtree = new MerkleTree([new Uint8Array(32)])
  tape.assert(mtree instanceof MerkleTree)

  tape.end()
});

test("MarkleTree for LICENSE should have predefined root hash", tape => {

  let fs = require('fs');
  let chunk_size = 1024;
  let buffer = new Buffer(chunk_size);

  let shift = 0;

  new Promise((resolve, reject) => {
    fs.open('LICENSE', 'r', (error, fd) => {
      if (error) {
        throw error;
      }

      let hashes = [];

      function readnext() {
        fs.read(fd, buffer, shift, chunk_size, undefined, (err, reads) => {
          if (err) {
            throw err;
          }

          // end //
          if (reads === 0) {

            fs.close(fd, (err_close) => {
              if (err_close) {
                throw  err_close;
              }
            });

            resolve(hashes);

            // not read
            return;
          }

          const hash = new Blake2s().update(new Uint8Array(buffer.slice(0, reads))).digest();

          hashes.push(hash);

          // read next //
          readnext();
        })
      }

      readnext();
    });
  }).then((data) => {

    // console.log(data);
    const tree = new MerkleTree(data);
    const info = tree.build();

    //console.log(JSON.stringify(info, 0, 2));

    tape.is(info.root, 'f08368a4bb17e33df79f9c63fa51fb1d60ca838d3219bc1cfb71e66f0d8ddc51');

  });

  tape.end()
});