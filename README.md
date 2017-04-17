# js-merkletree
Merkle tree implementation in JavaScript with Blake2s hash

# Description
In cryptography and computer science, a hash tree or Merkle tree is a tree in which every non-leaf node is labelled with the hash of the labels or values (in case of leaves) of its child nodes. Hash trees allow efficient and secure verification of the contents of large data structures. Hash trees are a generalization of hash lists and hash chains.

Demonstrating that a leaf node is a part of the given hash tree requires processing an amount of data proportional to the logarithm of the number of nodes of the tree; this contrasts with hash lists, where the amount is proportional to the number of nodes.

The concept of hash trees is named after Ralph Merkle who patented it in 1979.

# Authors
* [Mykola Bubelich](https://bubelich.com) 

# Projects
* [CryptoEsel](https://cryptoesel.com) - Safe and secure file transfer

# Output for `LICENSE` file

```
    {
      "elements": 12,
      "hashes": [
        "c9c9682005b05557cd87a68a90300eaa652cd6ffcae02d5d016977f11808f1f9",
        "cfa65885d98fd0ced985e159ba1222874ab41e6e760476d1d52b94eb7e730282",
        "5660bd0c28941286828cd0887d155c67615a0898e610f2f1307ed197081f46df",
        "f0c7741cff2ba2deeafb2fe27149d20eb0284188a819bef66c88e51ee3efc2bb",
        "ebecd0be6f850ad4ed3c21206aee2932675d99652ddca76227005dc672c11b6d",
        "f6505fd424a1ac47fdcb2d945edf5462c68a27b5c592e8cdce60e2565aa98441",
        "84684b4486e283312a75c8aef671081b3312d50724441ca7290ca388ca2ceb4a",
        "f6ab9672e1e9432ee7248e3cc4b0de54c4e6f2388e9a691fc3137761fec09d04",
        "6525d0dd2b3176e1a7f7289f8f397794426fb5f602b2bbdd591d1e46401558cc",
        "adb2fe820ef5db377cc5013521ebfbc08271b6fb299291ecca309be2dd5a0bb3",
        "b890b2ef8a6b3dbcbdb2df62b840b48d6ce4a1730d4df4a5509b05e00a8fee58",
        "c5c4a13c50959426e88219eca8aa73df13c3b1236ee280c3643bb975bf4216c2"
      ],
      "deep": 4,
      "stage": [
        [
          {
            "root": "f08368a4bb17e33df79f9c63fa51fb1d60ca838d3219bc1cfb71e66f0d8ddc51",
            "left": "5f4507bef602a7f6c2fa6e41045d575a5e68094cc4eb1e9154153aaff8840365",
            "right": "057094ca97e60c82575257e7fe70505378dc3cbadccef53042a282937b1c078a"
          }
        ],
        [
          {
            "root": "5f4507bef602a7f6c2fa6e41045d575a5e68094cc4eb1e9154153aaff8840365",
            "left": "401f498918d094cf2173f98ab0ddfabb6de01c056e4599a3424d8c862a429504",
            "right": "c65bd3c38949a9311dfbd87762774b486f4d9fc50672164bb4f0b2a96ed80ae5"
          },
          {
            "root": "057094ca97e60c82575257e7fe70505378dc3cbadccef53042a282937b1c078a",
            "left": "057094ca97e60c82575257e7fe70505378dc3cbadccef53042a282937b1c078a",
            "right": null
          }
        ],
        [
          {
            "root": "401f498918d094cf2173f98ab0ddfabb6de01c056e4599a3424d8c862a429504",
            "left": "fbbb7efb24f0778ccab518aed73e88ce9bf90a6238258b69245290ca0ed75d2b",
            "right": "5ac6f901943a398ec50e2dd49b9403ffe2fd35018a38976be833a22898ba5af9"
          },
          {
            "root": "c65bd3c38949a9311dfbd87762774b486f4d9fc50672164bb4f0b2a96ed80ae5",
            "left": "97a75817a8be847acaeb03810e8db13db112d7567c2838195fcdcca812a38e37",
            "right": "77e01036e2f62aaafed3f7f052d4e85bd14eed47e364d696608de518fd8e6667"
          },
          {
            "root": "057094ca97e60c82575257e7fe70505378dc3cbadccef53042a282937b1c078a",
            "left": "9c59c2370c2dc1c9848c4c300c0fb568c644690848aca1591c3b701cbe481644",
            "right": "bd7514c8bee97c672995fc76984f2e88fd490d07f9c6a49907780b0237eee2e7"
          }
        ],
        [
          {
            "root": "fbbb7efb24f0778ccab518aed73e88ce9bf90a6238258b69245290ca0ed75d2b",
            "left": "c9c9682005b05557cd87a68a90300eaa652cd6ffcae02d5d016977f11808f1f9",
            "right": "cfa65885d98fd0ced985e159ba1222874ab41e6e760476d1d52b94eb7e730282"
          },
          {
            "root": "5ac6f901943a398ec50e2dd49b9403ffe2fd35018a38976be833a22898ba5af9",
            "left": "5660bd0c28941286828cd0887d155c67615a0898e610f2f1307ed197081f46df",
            "right": "f0c7741cff2ba2deeafb2fe27149d20eb0284188a819bef66c88e51ee3efc2bb"
          },
          {
            "root": "97a75817a8be847acaeb03810e8db13db112d7567c2838195fcdcca812a38e37",
            "left": "ebecd0be6f850ad4ed3c21206aee2932675d99652ddca76227005dc672c11b6d",
            "right": "f6505fd424a1ac47fdcb2d945edf5462c68a27b5c592e8cdce60e2565aa98441"
          },
          {
            "root": "77e01036e2f62aaafed3f7f052d4e85bd14eed47e364d696608de518fd8e6667",
            "left": "84684b4486e283312a75c8aef671081b3312d50724441ca7290ca388ca2ceb4a",
            "right": "f6ab9672e1e9432ee7248e3cc4b0de54c4e6f2388e9a691fc3137761fec09d04"
          },
          {
            "root": "9c59c2370c2dc1c9848c4c300c0fb568c644690848aca1591c3b701cbe481644",
            "left": "6525d0dd2b3176e1a7f7289f8f397794426fb5f602b2bbdd591d1e46401558cc",
            "right": "adb2fe820ef5db377cc5013521ebfbc08271b6fb299291ecca309be2dd5a0bb3"
          },
          {
            "root": "bd7514c8bee97c672995fc76984f2e88fd490d07f9c6a49907780b0237eee2e7",
            "left": "b890b2ef8a6b3dbcbdb2df62b840b48d6ce4a1730d4df4a5509b05e00a8fee58",
            "right": "c5c4a13c50959426e88219eca8aa73df13c3b1236ee280c3643bb975bf4216c2"
          }
        ]
      ],
      "root": "f08368a4bb17e33df79f9c63fa51fb1d60ca838d3219bc1cfb71e66f0d8ddc51"
    }
```

