import test from 'tape'
import MerkleTree from '../js-merkletree';
import blake2s from 'js-blake2s';
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
  let chunk_size = 64;
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

          const hash = new blake2s().update(new Uint8Array(buffer.slice(0, reads))).digest();

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


    tape.is(info.root, '4dda343c05d6cfb005d9292cea0d4b32c4ad646b52473756c1a5e76bec647c0b');

  });

  tape.end()
});