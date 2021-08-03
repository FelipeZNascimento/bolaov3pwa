import styles from './styles.module.scss'

type TProps = {
    text: () => React.ReactNode;
}
const TextBox = ({
    text
}: TProps) => {
    return (
        <div className={styles.textBox}>
            {text()}
        </div>
    )
};

export default TextBox;