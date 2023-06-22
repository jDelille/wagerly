'use client'


import styles from './Breakdown.module.scss';

type Props = {
  title: string;
  description: string;
  leftTeamName: string;
  leftDisplayValue: string;
  leftPercent: number;
  colorValue1: string;
  rightTeamName: string;
  rightDisplayValue: string;
  rightPercent: number;
  colorValue2: string;
}

const BreakdownRow: React.FC<Props> = ({ title, description, leftTeamName, leftDisplayValue, leftPercent, rightTeamName, rightDisplayValue, rightPercent, colorValue1, colorValue2 }) => {

  const leftWidth = leftPercent &&
    `${(leftPercent * 100).toFixed(0)}%`;

  const rightWidth = rightPercent &&
    `${(rightPercent * 100).toFixed(0)}%`;

  const [red1, green1, blue1] = colorValue1
    .split(", ")
    .slice(1)
    .map(Number);
  const [red2, green2, blue2] = colorValue2
    .split(", ")
    .slice(1)
    .map(Number);

  const cssColor1 = `rgb(${red1}, ${green1}, ${blue1})`;
  const cssColor2 = `rgb(${red2}, ${green2}, ${blue2})`;

  return (
    <div className={styles.breakdown}>
      <strong>{title}</strong>
      <div className={styles.description}>{description}</div>
      <div className={styles.chart}>
        <strong>{leftTeamName}</strong>
        <span>{leftDisplayValue}</span>
        <div className={styles.bar}>
          <div
            className={styles.leftPercent}
            style={{ width: leftWidth, background: cssColor1 }}></div>
          <div
            className={styles.rightPercent}
            style={{ width: rightWidth, background: cssColor2 }}></div>
        </div>
        <span>{rightDisplayValue}</span>
        <strong>{rightTeamName}</strong>
      </div>

    </div>
  );
}

export default BreakdownRow;