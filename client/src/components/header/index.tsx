type Props = {
    name: string;
};

export const Header = ({ name }: Props) => {
    return (
        <h1 className="text-2xl font-semibold text-gray-700">{name}</h1>
    )
}