import { css } from "@emotion/css";

export const Header = () => {
  const cssHeader = css`
    background-color: darkgray;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
  `;
  return (
    <header className={cssHeader}>
      <h1>Title</h1>
    </header>
  );
};
