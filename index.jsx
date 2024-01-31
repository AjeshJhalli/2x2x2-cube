import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';

const file = Bun.file("table-2x2x2-compressed.json");
const content = await file.text();
const solutions = JSON.parse(content);

new Elysia()
  .use(html())
  .get('/', () => (
    <html lang='en'>
        <head>
            <title>2x2x2 Cube Solver</title>
            <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        </head>
        <body>
            <h1>2x2x2 Cube Solver</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>7</th>
                        <th>5</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>6</th>
                        <th>4</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>23</th>
                        <th>21</th>
                        <th>3</th>
                        <th>1</th>
                        <th>11</th>
                        <th>9</th>
                        <th>15</th>
                        <th>13</th>
                    </tr>
                    <tr>
                        <th>22</th>
                        <th>20</th>
                        <th>2</th>
                        <th>0</th>
                        <th>10</th>
                        <th>8</th>
                        <th>14</th>
                        <th>12</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>19</th>
                        <th>17</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>18</th>
                        <th>16</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
            <ul>
                <li>18 = White</li>
                <li>22 = Orange</li>
                <li>12 = Green</li>
            </ul>
            <p>
                Orient the cube so that the white-orange-green piece fits the criteria above.
            </p>
            <p>
                Then, input the colour letters in the order shown above.
            </p>
            <ul>
                <li>B - Blue</li>
                <li>Y - Yellow</li>
                <li>R - Red</li>
                <li>G - Green</li>
                <li>W - White</li>
                <li>O - Orange</li>
            </ul>
            <form hx-post='/solve' hx-target='#solution'>
                <label>
                    Enter cube state:
                    <input name='cube' type='text' />
                </label>
                <button>
                    Submit
                </button>
            </form>
            <p id='solution'>Solution:</p>
        </body>
    </html>
    ))
    .post('/solve', ({ body }) => {
        console.log(body.cube);

        const solution = solutions[body.cube];

        if (!solution) {
            return 'The cube is already solved.';
        }

        const moves = solution
            .toString()
            .split("")
            .map(move => {
                switch (move) {
                    case "1":
                        return "F";
                    case "2":
                        return "U";
                    case "3":
                        return "R";
                    case "4":
                        return "F'";
                    case "5":
                        return "U'";
                    case "6":
                        return "R'";
                    case "7":
                        return "F2";
                    case "8":
                        return "U2";
                    case "9":
                        return "R2"
                }
            })
            .join(" ");

        return 'Solution: ' + moves;
    })
  .listen(3000)