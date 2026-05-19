interface LineColorDotProps {
  color: string;
  size?: "sm" | "md" | "lg";
}

export function LineColorDot({ color, size = "md" }: LineColorDotProps) {
  const sizes = { sm: "w-2 h-2", md: "w-3 h-3", lg: "w-4 h-4" };
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 ${sizes[size]}`}
      style={{ backgroundColor: color }}
    />
  );
}

interface LineBadgeProps {
  lineName: string;
  primaryColor: string;
}

export function LineBadge({ lineName, primaryColor }: LineBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: primaryColor + "22",
        color: primaryColor,
        border: `1px solid ${primaryColor}44`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: primaryColor }}
      />
      {lineName}
    </span>
  );
}
