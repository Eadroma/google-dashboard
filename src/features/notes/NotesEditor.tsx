import type { FC, ChangeEvent } from 'react';

interface NotesEditorProps {
  content: string;
  placeholder: string;
  onChange: (text: string) => void;
}

/**
 * Presentational notes editor — a full-height plain textarea.
 *
 * @param props.content - Current note text
 * @param props.onChange - Called on every keystroke
 */
export const NotesEditor: FC<NotesEditorProps> = ({ content, placeholder, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => { onChange(e.target.value); };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-white/5">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wide text-shadow-sm">Notes</h3>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        spellCheck
        className="flex-1 resize-none w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none leading-relaxed text-shadow-sm"
      />
    </div>
  );
};
