'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ComboBoxProps {
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  emptyText: string;
  options: { value: string; label: string }[];
  value: string;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  disabled?: boolean;
}

export const VehicleComboBox = ({
  label,
  placeholder,
  searchPlaceholder,
  emptyText,
  options,
  value,
  onSelect,
  onSearch,
  disabled = false
}: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!open) setInputValue('');
  }, [open]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val.trim() !== '') onSearch && onSearch(val);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-2 text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between overflow-hidden text-left",
              disabled ? "opacity-50 cursor-not-allowed" : ""
            )}
            disabled={disabled}
          >
            {value ? options.find((opt) => opt.value === value)?.label : placeholder}
            <ChevronsUpDown className="opacity-50 ml-2" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full max-w-[400px] p-0">
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandList className="max-h-[200px] overflow-auto">
              {options.length === 0 ? (
                <CommandEmpty>{emptyText}</CommandEmpty>
              ) : (
                <CommandGroup>
                  {options
                    .filter((opt) =>
                      opt.label.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          onSelect(option.value);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
