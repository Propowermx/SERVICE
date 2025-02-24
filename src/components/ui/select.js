export function Select({ children, onChange }) {
    return <select className="border p-2 rounded w-full" onChange={onChange}>{children}</select>;
  }
  export function SelectTrigger({ children }) {
    return <div className="border p-2 rounded">{children}</div>;
  }
  export function SelectContent({ children }) {
    return <div>{children}</div>;
  }
  export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
  }
  export function SelectValue({ placeholder }) {
    return <span>{placeholder}</span>;
  }
  