import style from "./spinner.module.scss";

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 16 }: SpinnerProps) {
  return (
    <span
      className={style.Spinner}
      style={{
        // @ts-expect-error - custom property
        "--spinner-size": `${size}px`,
      }}
    >
      <span className={style.SpinnerLeaf} />
      <span className={style.SpinnerLeaf} />
      <span className={style.SpinnerLeaf} />
      <span className={style.SpinnerLeaf} />
      <span className={style.SpinnerLeaf} />
      <span className={style.SpinnerLeaf} />
      <span className={style.SpinnerLeaf} />
      <span className={style.SpinnerLeaf} />
    </span>
  );
}
