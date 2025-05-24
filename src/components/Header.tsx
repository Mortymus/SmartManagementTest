interface Props {
    headline: string;
}

function Header({ headline }: Props) {
    return (
        <header>
            <h1>Taghub file explorer</h1>
            <h2>{headline}</h2>
        </header>
    );
}

export default Header;