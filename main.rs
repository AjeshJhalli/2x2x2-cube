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
    let turned_cube2 = turn_front_prime(turned_cube.clone());
    let turned_cube3 = turn_right(turned_cube2.clone());
    let turned_cube4 = turn_right_prime(turned_cube3.clone());
    let turned_cube5 = turn_top(turned_cube4.clone());
    let turned_cube6 = turn_top_prime(turned_cube5.clone());
    display_cube(turned_cube6);
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

fn rotate_face_right(num: i32) -> i32 {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    (nibble0 >> 1 | nibble0 << 3) & 0xF00000 |
    (nibble1 >> 1 | nibble1 << 3) & 0x0F0000 |
    (nibble2 >> 1 | nibble2 << 3) & 0x00F000 |
    (nibble3 >> 1 | nibble3 << 3) & 0x000F00 |
    (nibble4 >> 1 | nibble4 << 3) & 0x0000F0 |
    (nibble5 >> 1 | nibble5 << 3) & 0x00000F
}


fn rotate_face_left(num: i32) -> i32 {

    let nibble0 = num & 0xF00000;
    let nibble1 = num & 0x0F0000;
    let nibble2 = num & 0x00F000;
    let nibble3 = num & 0x000F00;
    let nibble4 = num & 0x0000F0;
    let nibble5 = num & 0x00000F;

    (nibble0 << 1 | nibble0 >> 3) & 0xF00000 |
    (nibble1 << 1 | nibble1 >> 3) & 0x0F0000 |
    (nibble2 << 1 | nibble2 >> 3) & 0x00F000 |
    (nibble3 << 1 | nibble3 >> 3) & 0x000F00 |
    (nibble4 << 1 | nibble4 >> 3) & 0x0000F0 |
    (nibble5 << 1 | nibble5 >> 3) & 0x00000F
}

fn turn_front(mut cube: Cube) -> Cube {

    cube.front = rotate_face_right(cube.front);

    let temp_top = cube.top;

    cube.top = cube.top & 0xCCCCCC | (cube.left & 0x666666) >> 1;
    cube.left = cube.left & 0x999999 | (cube.bottom & 0xCCCCCC) >> 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.right & 0x888888) >> 1 | (cube.right & 0x111111) << 3;
    cube.right = cube.right & 0x666666 | (temp_top & 0x111111) << 3 | (temp_top & 0x222222) >> 1;

    cube
}

fn turn_top(mut cube: Cube) -> Cube {

    cube.top = rotate_face_right(cube.top);

    let temp_front = cube.front;

    cube.front = cube.front & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | temp_front & 0xCCCCCC;

    cube
}

fn turn_right(mut cube: Cube) -> Cube {

    cube.right = rotate_face_right(cube.right);

    let temp_front = cube.front;

    cube.front = cube.front & 0x999999 | cube.bottom & 0x666666;
    cube.bottom = cube.bottom & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (cube.top & 0x444444) >> 2 | (cube.top & 0x222222) << 2;
    cube.top = cube.top & 0x999999 | temp_front & 0x666666;

    cube
}

fn turn_front_prime(mut cube: Cube) -> Cube {

    cube.front = rotate_face_left(cube.front);

    let temp_top = cube.top;

    cube.top = cube.top & 0xCCCCCC | (cube.right & 0x888888) >> 3 | (cube.right & 0x111111) << 1;
    cube.right = cube.right & 0x666666 | (cube.bottom & 0x888888) >> 3 | (cube.bottom & 0x444444) << 1;
    cube.bottom = cube.bottom & 0x333333 | (cube.left & 0x666666) << 1;
    cube.left = cube.left & 0x999999 | (temp_top & 0x333333) << 1;

    cube
}

fn turn_top_prime(mut cube: Cube) -> Cube {

    cube.top = rotate_face_left(cube.top);

    let temp_front = cube.front;

    cube.front = cube.front & 0x333333 | cube.left & 0xCCCCCC;
    cube.left = cube.left & 0x333333 | cube.back & 0xCCCCCC;
    cube.back = cube.back & 0x333333 | cube.right & 0xCCCCCC;
    cube.right = cube.right & 0x333333 | temp_front & 0xCCCCCC;

    cube
}

fn turn_right_prime(mut cube: Cube) -> Cube {
    
    cube.right = rotate_face_left(cube.right);

    let temp_front = cube.front;

    cube.front = cube.front & 0x999999 | cube.top & 0x666666;
    cube.top = cube.top & 0x999999 | (cube.back & 0x888888) >> 2 | (cube.back & 0x111111) << 2;
    cube.back = cube.back & 0x666666 | (cube.bottom & 0x444444) >> 2 | (cube.bottom & 0x222222) << 2;
    cube.bottom = cube.bottom & 0x999999 | temp_front & 0x666666;

    cube
}
