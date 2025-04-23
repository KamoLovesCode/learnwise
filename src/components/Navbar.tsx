import { Link } from "react-router-dom"
import { Home, Plus, Book, Clipboard } from "lucide-react"  // updated icons
import { useState } from "react"

export function Navbar() {
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // call Gemini API to fetch textbook and chapters (stub implementation)
      console.log("Fetching data for:", inputValue)
      // ...gemini fetch logic...
      setInputValue("")
      setShowInput(false)
    }
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="max-w-md mx-auto px-4 py-2">
          <ul className="flex items-center justify-around">
            <li>
              <Link to="/" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
                <Home size={24} />
                <span className="text-xs">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/library" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
                <Book size={24} />
                <span className="text-xs">Library</span>
              </Link>
            </li>
            <li>
              <button onClick={() => setShowInput(true)} className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
                <Plus size={24} />
                <span className="text-xs">Add Book</span>  {/* changed label */}
              </button>
            </li>
            <li>
              <Link to="/create-task" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
                <Clipboard size={24} />
                <span className="text-xs">Create Task</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {showInput && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Enter textbook"
              className="border p-2"
            />
          </div>
        </div>
      )}
    </>
  )
}
