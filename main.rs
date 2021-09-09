// 6 24-bit numbers, one for each colour

// BLUE YELLOW RED GREEN WHITE ORANGE

#[derive(Copy, Clone)]
struct Cube {
    front: i32,
    top: i32,
    right: i32,
    back: i32,
    bottom: i32,
    left: i32,
}

fn main() {

    let cube = Cube {
        front: 0xF00000,
        top: 0x0F0000,
        right: 0x00F000,
        back: 0x000F00,
        bottom: 0x0000F0,
        left: 0x00000F
    };

    display_cube(cube);
    let turned_cube = turn_front(cube.clone());
    display_cube(turned_cube);
}

fn display_cube(cube: Cube) {
    println!("Front:  {:06x}", cube.front);
    println!("Top:    {:06x}", cube.top);
    println!("Right:  {:06x}", cube.right);
    println!("Back:   {:06x}", cube.back);
    println!("Bottom: {:06x}", cube.bottom);
    println!("Left:   {:06x}", cube.left);
    println!("");
}


// 4-bit rotation
/*
fn rotate_bits_right(num: i32) -> i32 {
    ((num >> 1) | (num << 3)) & 0xF
}

fn rotate_bits_left(num: i32) -> i32 {
    ((num << 1) | (num >> 3)) & 0xF
}

fn rotate_bits_twice(num: i32) -> i32 {
    ((num >> 2) | (num << 2)) & 0xF
}
*/

fn rotate_face_right(num: i32) -> i32 {

    //((num >> 1) | (num << 3)) & 0x00F |
    //(((num >> 5) | (num >> 1)) << 4) & 0x00F0 ;

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    ((nibble0 >> 1) | (nibble0 << 3)) & 0xF00000 |
    ((nibble1 >> 1) | (nibble1 << 3)) & 0x0F0000 |
    ((nibble2 >> 1) | (nibble2 << 3)) & 0x00F000 |
    ((nibble3 >> 1) | (nibble3 << 3)) & 0x000F00 |
    ((nibble4 >> 1) | (nibble4 << 3)) & 0x0000F0 |
    ((nibble5 >> 1) | (nibble5 << 3)) & 0x00000F
}

fn turn_front(mut cube: Cube) -> Cube {

    cube.front = rotate_face_right(cube.front);

    let temp_top = cube.top;

    cube.top &= 0xCCCCCC;
    cube.top |= (cube.left & 0x666666) >> 1;

    cube.left &= 0x999999;
    cube.left |= (cube.bottom & 0xCCCCCC) >> 1;

    cube.bottom &= 0x333333;
    cube.bottom |= ((cube.right & 0x888888) >> 1) | ((cube.right & 0x111111) << 3);

    cube.right &= 0x666666;
    cube.right |= ((temp_top & 0x111111) << 3) | ((temp_top & 0x222222) >> 1);

    cube
}