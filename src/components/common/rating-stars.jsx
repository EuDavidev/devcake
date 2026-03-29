import { Star } from "lucide-react";

export function RatingStars({ value = 5, size = "sm" }) {
    const starSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";

    return (
        <div className="flex items-center gap-1" aria-label={`Avaliação de ${value} de 5`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={`${starSize} ${index < value ? "fill-browndev text-browndev" : "text-browndev/30"}`}
                />
            ))}
        </div>
    );
}
