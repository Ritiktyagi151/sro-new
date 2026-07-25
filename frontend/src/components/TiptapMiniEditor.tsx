// @ts-nocheck
"use client";
import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { TextStyle } from "@tiptap/extension-text-style";

export default function TiptapMiniEditor({ value, onChange, placeholder = "Write content here...", editorClass = "" }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      LinkExtension.configure({ openOnClick: false }),
      TextStyle,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: `tiptap-editor-content focus:outline-none overflow-y-auto p-3.5 w-full bg-white text-sm text-gray-900 border border-gray-300 rounded-b-lg ${editorClass || "min-h-[160px] max-h-[300px]"}`,
      },
    },
  });

  // Keep editor content in sync with outer changes if value changes programmatically
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (editor.getHTML() !== value) {
        editor.commands.setContent(value || "");
      }
    }
  }, [value, editor]);

  const handleInsertImage = () => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result;
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiBase}/api/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: file.name, data: base64Data })
        });
        if (res.ok) {
          const data = await res.json();
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="flex flex-col w-full text-xs">
      {/* Mini Toolbar */}
      <div className="flex flex-wrap gap-1 border border-gray-300 rounded-t-lg bg-gray-50 p-2 select-none">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-2 py-0.5 rounded font-bold cursor-pointer ${editor?.isActive("bold") ? "bg-gray-250 text-gray-900" : "text-gray-600 hover:bg-gray-150"
            }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-2 py-0.5 rounded italic cursor-pointer ${editor?.isActive("italic") ? "bg-gray-250 text-gray-900" : "text-gray-600 hover:bg-gray-150"
            }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-0.5 rounded font-bold cursor-pointer ${editor?.isActive("heading", { level: 2 }) ? "bg-gray-250 text-gray-900" : "text-gray-600 hover:bg-gray-150"
            }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-0.5 rounded font-bold cursor-pointer ${editor?.isActive("heading", { level: 3 }) ? "bg-gray-250 text-gray-900" : "text-gray-600 hover:bg-gray-150"
            }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`px-2 py-0.5 rounded cursor-pointer ${editor?.isActive("bulletList") ? "bg-gray-250 text-gray-900" : "text-gray-600 hover:bg-gray-150"
            }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-0.5 rounded cursor-pointer ${editor?.isActive("orderedList") ? "bg-gray-250 text-gray-900" : "text-gray-600 hover:bg-gray-150"
            }`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={handleInsertImage}
          className="px-2 py-0.5 rounded text-gray-650 hover:bg-gray-150 cursor-pointer"
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="px-2 py-0.5 rounded text-gray-650 hover:bg-gray-150 cursor-pointer"
        >
          Table
        </button>
        {editor?.isActive("table") && (
          <div className="flex gap-1 items-center border-l border-gray-300 pl-1.5 ml-1 text-[9px]">
            <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="p-0.5 bg-white border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">Add Col</button>
            <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="p-0.5 bg-white border border-gray-200 rounded hover:bg-gray-50 text-red-500 cursor-pointer">Del Col</button>
            <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="p-0.5 bg-white border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">Add Row</button>
            <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="p-0.5 bg-white border border-gray-200 rounded hover:bg-gray-50 text-red-500 cursor-pointer">Del Row</button>
            <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="p-0.5 bg-white border border-gray-200 rounded hover:bg-gray-50 text-red-600 font-bold cursor-pointer">Delete Table</button>
          </div>
        )}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
