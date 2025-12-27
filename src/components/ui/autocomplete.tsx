import React, { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AutocompleteProps {
    options: string[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string; // Added className prop
}

export function Autocomplete({
    options,
    value = "",
    onChange,
    placeholder = "Type to search...",
    className,
}: AutocompleteProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
    );

    const showDropdown = value.length >= 2 && open && filteredOptions.length > 0;

    return (
        <div ref={wrapperRef} className="relative">
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => {
                    if (value.length >= 2) setOpen(true);
                }}
                className={className}
            />
            {showDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground rounded-md border shadow-md max-h-[200px] overflow-y-auto animate-in fade-in-0 zoom-in-95">
                    <ul className="py-1">
                        {filteredOptions.map((option) => (
                            <li
                                key={option}
                                className={cn(
                                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground hover:cursor-pointer",
                                    value === option && "bg-accent text-accent-foreground"
                                )}
                                onClick={() => {
                                    onChange(option);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === option ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
