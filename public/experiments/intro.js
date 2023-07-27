/**
 * @type {import('../index').Experiment}
 */
export default function experiment({ info }) {
  info(
    "Hey there. Click on me to get started.",
    `This is a lab site where ${info.link(
      "I",
      "https://seif.sh"
    )} experiment with the HTML
    ${info.link(
      "Canvas API",
      "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
    )}
    by making physics-based art.
    <br/><br/>Click on the menu button and pick a scene to load.
    Some scenes will have an info popup like this one, and/or some
    parameters to control.
    <br/><br/>Have fun!`
  );
}
