'use client'
import { Button, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React from "react";
import { animals } from "./data";
export default function ServerPage() {

  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const isValid = value === "cat";
  return (
    <div className="flex justify-center w-full">
      <div className="flex border min-w-[700px] shadow-2xl mt-3 pt-9 rounded-xl h-96 justify-center backdrop-blur-sm bg-white/20">
        <Input
          className="w-30"
          defaultValue="0.0.0.0"
        />
        <Input
          className="ml-2 w-20"
          defaultValue="31672"
        />
        <Button
          className="h-14 ml-2"
          isLoading
          color="secondary"
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
        >
          启动中
        </Button>
        <Autocomplete
          label="Favorite Animal"
          variant="bordered"
          placeholder="Search an animal"
          description="The second most popular pet in the world"
          errorMessage={isValid || !touched ? "" : "You must select a cat"}
          isInvalid={isValid || !touched ? false : true}
          defaultItems={animals}
          selectedKey={value}
          className="max-w-xs"
          onSelectionChange={(item) => { setValue(item); console.log(item) }}
          onClose={() => setTouched(true)}
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      </div>
    </div>
  );
}
