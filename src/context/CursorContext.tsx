import { createContext, useContext, useState, type ReactNode } from "react"

export type CursorVariant = "default" | "button" | "card" | "text" | "name"

type CursorContextType = {
  variant: CursorVariant
  setVariant: (v: CursorVariant) => void
}

const CursorContext = createContext<CursorContextType>({
  variant: "default",
  setVariant: () => {},
})

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default")
  return (
    <CursorContext.Provider value={{ variant, setVariant }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}
