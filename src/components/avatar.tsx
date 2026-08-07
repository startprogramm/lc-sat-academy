type AvatarProps = {
  name: string | null;
  image: string | null;
  className?: string;
};

export function Avatar({ name, image, className = "h-14 w-14" }: AvatarProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external OAuth avatar URLs, not optimizable by next/image without config
      <img
        src={image}
        alt=""
        className={`${className} rounded-full object-cover`}
      />
    );
  }

  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <div
      className={`${className} flex items-center justify-center rounded-full bg-brand font-display font-bold text-paper`}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
