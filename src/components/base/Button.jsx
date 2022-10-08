import "../../styles/components/base/Button.css";

export function MyButton({ className, value, onClick, style }) {
  return (
    <div>
      <button style={ style } className={className} onClick={onClick}>{ value }</button>
    </div>
  );
}
