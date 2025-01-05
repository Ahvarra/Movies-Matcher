import { TitleProps } from "@/types";
import styles from "./rwd.module.scss";

export function Title({ title, subtitle }: TitleProps) {
	return (
		<div className={styles.wrapper}>
			<h1>{title}</h1>
			{subtitle && <p>{subtitle}</p>}
		</div>
	);
}
