import React, { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input, Button, Tooltip } from "@nextui-org/react";
import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import { debounce } from "lodash";

const UsernameCheckerSection: React.FC = () => {
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const client = createClient();
      setSupabase(client);
    } catch (err) {
      console.error("Error creating Supabase client:", err);
      setError("Failed to initialize Supabase client");
    }
  }, []);

  const checkUsername = useCallback(async (value: string) => {
    if (!value.trim() || !supabase) return;

    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("username", value.toLowerCase())
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          setIsAvailable(true);
          setSuggestions([]);
        } else {
          throw error;
        }
      } else {
        setIsAvailable(false);
        generateSuggestions(value);
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setIsAvailable(null);
      setError("An error occurred while checking the username");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const debouncedCheckUsername = useCallback(
    debounce((value: string) => checkUsername(value), 300),
    [checkUsername]
  );

  useEffect(() => {
    if (username.length >= 3) {
      debouncedCheckUsername(username);
    } else {
      setIsAvailable(null);
      setSuggestions([]);
    }
  }, [username, debouncedCheckUsername]);

  const generateSuggestions = (value: string) => {
    const suggestionList = [
      `${value}123`,
      `${value}_`,
      `${value}${Math.floor(Math.random() * 1000)}`,
    ];
    setSuggestions(suggestionList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const getInputColor = () => {
    if (isAvailable === null) return "default";
    return isAvailable ? "success" : "danger";
  };

  return (
    <section id="check" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white">
              Check the name and get your link
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Enter your desired username to check its availability and secure your unique Linktree URL.
            </p>
            <div className="w-full max-w-sm space-y-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="your-username"
                value={username}
                onChange={handleInputChange}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">linktr.ee/</span>
                  </div>
                }
                color={getInputColor()}
                aria-label="Enter your desired username"
                aria-describedby="username-availability"
              />

            </div>
            {error && (
              <p className="text-red-500 dark:text-red-400" role="alert">{error}</p>
            )}
            {isAvailable !== null && !error && (
              <p 
                id="username-availability"
                className={isAvailable ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}
                role="status"
              >
                {isAvailable
                  ? "Username is available!"
                  : "Username is already taken."}
              </p>
            )}
            {!isAvailable && suggestions.length > 0 && (
              <div>
                <p className="text-black dark:text-white">Suggested alternatives:</p>
                <ul className="list-disc pl-5">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <Tooltip className="text-gray-800 dark:text-white" content="Click to use this suggestion">
                        <button
                          className="text-blue-500 hover:underline focus:outline-none"
                          onClick={() => setUsername(suggestion)}
                          aria-label={`Use suggested username: ${suggestion}`}
                        >
                          {suggestion}
                        </button>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/header.png"
              alt="Username Checker Illustration"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsernameCheckerSection;














              {/* <Button
                color="primary"
                onClick={() => checkUsername(username)}
                isLoading={isLoading}
                isDisabled={username.length < 3 || isLoading || !supabase}
              >
                {isLoading ? "Checking..." : "Check Availability"}
              </Button> */}