type IconProps = {
  className?: string;
  size?: number;
};

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const
  };
}

export function IconPhone({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.37 1.59.71 2.31a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrow({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBolt({ className, size = 26 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDroplet({ className, size = 26 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M12 2s7 7.1 7 12a7 7 0 1 1-14 0c0-4.9 7-12 7-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 15a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconShield({ className, size = 26 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M12 3 20 6v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6l8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m8.5 12 2.2 2.2L15.8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWrench({ className, size = 26 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M14.7 6.3a4.6 4.6 0 0 0-5.8 5.8l-5.5 5.5a2.1 2.1 0 0 0 3 3l5.5-5.5a4.6 4.6 0 0 0 5.8-5.8l-3.1 3.1-3-3 3.1-3.1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClock({ className, size = 26 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPin({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconSpark({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...base(size)}>
      <path d="M12 2l1.4 6.1L19 11l-5.6 2.9L12 20l-1.4-6.1L5 11l5.6-2.9L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
