#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('./2020/day20-input.txt', 'utf-8').trim();
const lines = input.split(/\n/);


console.log(lines);

const tiles = [
    {
        id: '2311',
        rows: [
            '..##.#..#.',
            '##..#.....',
            '#...##..#.',
            '####.#...#',
            '##.##.###.',
            '##...#.###',
            '.#.#.#..##',
            '..#....#..',
            '###...#.#.',
            '..###..###'
        ]
    },
    {
        id: '1951',
        rows: [
            '#.##...##.',
            '#.####...#',
            '.....#..##',
            '#...######',
            '.##.#....#',
            '.###.#####',
            '###.##.##.',
            '.###....#.',
            '..#.#..#.#',
            '#...##.#..',
        ]
    }
];


/**
 * row,col
 * 0,1,2
 * 3,4,5
 * 6,7,8
 */
const placed = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const bigImage = [
    [[], [], []],
    [[], [], []],
    [[], [], []]
];

const width = Math.sqrt(tiles.length);

const init = () => {
    for (let j = 0; j < width; j++) {
        for (let i = 0; i < width; i++) {
            placed[j][i] = 0;
            bigImage[j][i] = [];
        }
    }
}

init();

const rotate = (tile, angle, flip) => {
    const newTile = [];

    for (let r = 0; r < angle; r += 90) {
        for (let j = 0; j < width; j++) {
            newTile[j] = '';
            for (let i = 0; i < width; i++) {
                newTile[j] += tile[i][j];
            }
        }
    }

    if (flip) {

    }


};

const place = (tileNum) => {

    const tile = [...tiles[tileNum].rows];
    for (let j = 0; j < width; j++) {
        for (let i = 0; i < width; i++) {
            for (let a = 0; a < 360; a += 90) {
                for (let f = 0; f < 2; f++) {
                    tile = rotate([...tiles[tileNum].rows], a, f;)
                }
            }
        }
    }


    place(1)

}
place(0);
