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
        front: 0x00F00000,
        top: 0x000F0000,
        right: 0x0000F000,
        back: 0x00000F00,
        bottom: 0x000000F0,
        left: 0x0000000F
    };

    display_cube(cube);
    let turned_cube = turn_front(cube.clone());
    display_cube(turned_cube);
}

fn display_cube(cube: Cube) {
    println!("Front:  {:08x}", cube.front);
    println!("Top:    {:08x}", cube.top);
    println!("Right:  {:08x}", cube.right);
    println!("Back:   {:08x}", cube.back);
    println!("Bottom: {:08x}", cube.bottom);
    println!("Left:   {:08x}", cube.left);
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

fn rotate_face_right(num: i32) {

    ((num >> 1) | (num << 3)) & 0x00F |
    (((num >> 5) | (num >> 1)) << 4) & 0x00F0 ;
}
*/
fn turn_front(mut cube: Cube) -> Cube {
    /*
    cube.front = rotate_bits_right(cube.front) |
                 (rotate_bits_right(cube.front >> 4) << 4) |
                 (rotate_bits_right(cube.front >> 8) << 8) |
                 (rotate_bits_right(cube.front >> 12) << 12) |
                 (rotate_bits_right(cube.front >> 16) << 16) |
                 (rotate_bits_right(cube.front >> 20) << 20);
    */

    let temp_top = cube.top;

    cube.top &= 0x00CCCCCC;
    cube.top |= (cube.left & 0x00666666) >> 1;

    cube.left &= 0x00999999;
    cube.left |= (cube.bottom & 0x00CCCCCC) >> 1;

    cube.bottom &= 0x00333333;
    cube.bottom |= ((cube.right & 0x00888888) >> 1) | ((cube.right & 0x00111111) << 3);

    cube.right &= 0x00AAAAAA;
    cube.right |= ((temp_top & 0x00111111) << 1) | ((temp_top & 0x00888888) >> 3);

    cube
}