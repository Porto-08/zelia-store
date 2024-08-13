type TitleProps = {
  title: string;
};

export default function Title({ title }: TitleProps) {
  return (
    <h1 className="text-4xl font-bold">
      <span className="text-primary">
        {title}
      </span>
    </h1>
  );
}
