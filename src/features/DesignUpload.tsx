import { FileText, Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const DesignUpload = () => {
  const { register, setValue, watch } = useFormContext();

  // Ambil state dari RHF
  const designFile = watch("designFile");
  const designNote = watch("designNote");

  const handleFileUpload = (file: File, type: "designFile") => {
    setValue(type, file, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FileText className="h-5 w-5 text-pink-600" />
        <h2 className="text-lg font-semibold text-gray-900">Design</h2>
      </div>

      {/* Upload File */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Design File
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            className="hidden"
            id="design-file"
            accept="image/*,.pdf,.ai,.psd"
            onChange={(e) =>
              e.target.files?.[0] &&
              handleFileUpload(e.target.files[0], "designFile")
            }
          />
          <label htmlFor="design-file" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {designFile
                ? designFile.name
                : "Upload design file (Image, PDF, AI, PSD)"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Drag and drop or click to browse
            </p>
          </label>
        </div>
      </div>

      {/* Design Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Design Note
        </label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add design specifications, requirements, or notes..."
          {...register("designNote")}
          defaultValue={designNote || ""}
        />
      </div>
    </div>
  );
};
