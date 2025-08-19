import React, { useState } from "react";

export default function AddTaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [scheduled_for, setScheduleDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = () => {
    const taskData = { title, scheduled_for, priority, description, image };
    onSubmit(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-[700px] shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            <span className="text-red-500">Add New Task</span>
          </h2>
          <button className="text-blue-600 underline text-sm" onClick={onClose}>
            Go Back
          </button>
        </div>

        {/* Title */}
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md w-full p-2 mb-4"
        />

        {/* Date */}
        <label className="block text-sm font-medium mb-1">Scheduled For</label>
        <input
          type="date"
          value={scheduled_for}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="border rounded-md w-full p-2 mb-4"
        />

        {/* Priority */}
        <label className="block text-sm font-medium mb-1">Priority</label>
        <div className="flex items-center gap-6 mb-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="priority"
              value="Extreme"
              onChange={(e) => setPriority(e.target.value)}
            />
            <span className="text-red-500">●</span> Extreme
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="priority"
              value="Moderate"
              onChange={(e) => setPriority(e.target.value)}
            />
            <span className="text-blue-500">●</span> Moderate
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="priority"
              value="Low"
              onChange={(e) => setPriority(e.target.value)}
            />
            <span className="text-green-500">●</span> Low
          </label>
        </div>

        {/* Description & Image Upload */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Task Description
            </label>
            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Start writing here..."
              className="border rounded-md w-full p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image
            </label>
            <div className="border-2 border-dashed rounded-md p-4 text-center text-gray-500">
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={handleImageUpload}
              />
              <label htmlFor="fileUpload" className="cursor-pointer block">
                Drag & Drop files here
                <br />
                <span className="text-sm text-gray-400">or</span>
                <br />
                <span className="text-blue-500 underline">Browse</span>
              </label>
              {image && (
                <p className="mt-2 text-sm text-gray-600">{image.name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-Black px-6 py-2 rounded-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
