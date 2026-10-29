"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Format = "image/png" | "image/jpeg";

const PRESETS = [
  { label: "General profile picture", width: 500, height: 500 },
  { label: "LinkedIn-style square", width: 400, height: 400 },
  { label: "Instagram-style square", width: 320, height: 320 },
  { label: "WhatsApp-style square", width: 500, height: 500 },
  { label: "Custom size", width: 500, height: 500 },
];

export default function ProfilePictureResizerPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState("profile-picture");
  const [preset, setPreset] = useState("General profile picture");
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [format, setFormat] = useState<Format>("image/png");
  const [quality, setQuality] = useState(0.92);
  const [circlePreview, setCirclePreview] = useState(true);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previousUrlRef.current) URL.revokeObjectURL(previousUrlRef.current);
    };
  }, []);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError("");
    setReady(false);

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file, such as JPG, PNG, or WebP.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Please choose an image smaller than 20 MB.");
      return;
    }

    if (previousUrlRef.current) URL.revokeObjectURL(previousUrlRef.current);
    const nextUrl = URL.createObjectURL(file);
    previousUrlRef.current = nextUrl;
    setImageUrl(nextUrl);
    setImageName(file.name.replace(/\.[^/.]+$/, "") || "profile-picture");
  }

  function handlePresetChange(value: string) {
    setPreset(value);
    const chosen = PRESETS.find((item) => item.label === value);
    if (chosen && value !== "Custom size") {
      setWidth(chosen.width);
      setHeight(chosen.height);
    }
  }

  function resizeImage() {
    setError("");
    setReady(false);

    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || !image.complete || !image.naturalWidth) {
      setError("Please upload an image first.");
      return;
    }
    if (
      !Number.isInteger(width) ||
      !Number.isInteger(height) ||
      width < 1 ||
      height < 1 ||
      width > 4000 ||
      height > 4000
    ) {
      setError("Width and height must be whole numbers between 1 and 4000 pixels.");
      return;
    }

    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      setError("Your browser could not process this image. Please try another browser.");
      return;
    }

    // Center-crop the source image to the requested aspect ratio, then resize it.
    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const targetRatio = width / height;
    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = image.naturalWidth;
    let sourceHeight = image.naturalHeight;

    if (sourceRatio > targetRatio) {
      sourceWidth = image.naturalHeight * targetRatio;
      sourceX = (image.naturalWidth - sourceWidth) / 2;
    } else if (sourceRatio < targetRatio) {
      sourceHeight = image.naturalWidth / targetRatio;
      sourceY = (image.naturalHeight - sourceHeight) / 2;
    }

    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      width,
      height
    );

    setReady(true);
  }

  function downloadImage() {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Could not create the image. Please try again.");
          return;
        }
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${imageName}-resized.${format === "image/png" ? "png" : "jpg"}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(downloadUrl);
      },
      format,
      format === "image/jpeg" ? quality : undefined
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
        >
          <span aria-hidden="true">←</span> Back to FreeTools Hub
        </a>

        <header className="mb-8 mt-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
            🖼️
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Profile Picture Resizer
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Resize your photo for a profile picture. Choose a size, preview the
            result, and download it for free.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold">1. Upload your photo</h2>
            <p className="mt-1 text-sm text-slate-600">
              JPG, PNG, or WebP. Maximum file size: 20 MB.
            </p>

            <label
              htmlFor="profile-image"
              className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-300 bg-violet-50 px-5 py-10 text-center transition hover:bg-violet-100"
            >
              <span className="text-3xl" aria-hidden="true">⬆️</span>
              <span className="mt-3 font-semibold text-violet-800">
                Choose an image
              </span>
              <span className="mt-1 text-sm text-slate-600">
                Click here to browse your files
              </span>
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="sr-only"
            />

            {imageUrl && (
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-slate-700">
                  Original image
                </p>
                <div className="flex max-h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-100 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Original image selected for resizing"
                    onLoad={() => setError("")}
                    className="max-h-60 max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            <h2 className="mt-7 text-lg font-semibold">2. Choose dimensions</h2>
            <label htmlFor="preset" className="mt-3 block text-sm font-medium">
              Size preset
            </label>
            <select
              id="preset"
              value={preset}
              onChange={(event) => handlePresetChange(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            >
              {PRESETS.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="width" className="block text-sm font-medium">
                  Width (px)
                </label>
                <input
                  id="width"
                  type="number"
                  min={1}
                  max={4000}
                  value={width}
                  onChange={(event) => {
                    setWidth(Number(event.target.value));
                    setPreset("Custom size");
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium">
                  Height (px)
                </label>
                <input
                  id="height"
                  type="number"
                  min={1}
                  max={4000}
                  value={height}
                  onChange={(event) => {
                    setHeight(Number(event.target.value));
                    setPreset("Custom size");
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />
              </div>
            </div>

            <label htmlFor="format" className="mt-5 block text-sm font-medium">
              Download format
            </label>
            <select
              id="format"
              value={format}
              onChange={(event) => setFormat(event.target.value as Format)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            >
              <option value="image/png">PNG — best for quality</option>
              <option value="image/jpeg">JPEG — smaller photo files</option>
            </select>

            {format === "image/jpeg" && (
              <div className="mt-4">
                <label htmlFor="quality" className="flex justify-between text-sm font-medium">
                  JPEG quality <span>{Math.round(quality * 100)}%</span>
                </label>
                <input
                  id="quality"
                  type="range"
                  min={0.5}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  className="mt-2 w-full accent-violet-700"
                />
              </div>
            )}

            <button
              type="button"
              onClick={resizeImage}
              className="mt-6 w-full rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
            >
              Resize image
            </button>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold">3. Preview and download</h2>
            <p className="mt-1 text-sm text-slate-600">
              The image is center-cropped to fit the dimensions you choose.
            </p>

            <div className="mt-5 flex min-h-72 items-center justify-center rounded-xl bg-slate-100 p-5">
              <div className="text-center">
                <div className="mx-auto flex h-56 w-56 items-center justify-center overflow-hidden bg-white shadow-sm">
                  <canvas
                    ref={canvasRef}
                    aria-label="Resized image preview"
                    className={`${ready ? "block" : "hidden"} max-h-56 max-w-56 object-contain ${circlePreview ? "rounded-full" : ""}`}
                    style={{
                      width: `${Math.min(224, 224 * (width / height))}px`,
                      height: `${Math.min(224, 224 * (height / width))}px`,
                    }}
                  />
                  {!ready && (
                    <div className="max-w-xs px-3 text-center text-slate-500">
                      <div className="text-5xl" aria-hidden="true">👤</div>
                      <p className="mt-3 font-medium">Your resized photo will appear here</p>
                      <p className="mt-1 text-sm">Upload a photo and select “Resize image”.</p>
                    </div>
                  )}
                </div>
                {ready && (
                  <p className="mt-4 text-sm font-medium text-slate-700">
                    {width} × {height} pixels
                  </p>
                )}
              </div>
            </div>

            <label className="mt-5 flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={circlePreview}
                onChange={(event) => setCirclePreview(event.target.checked)}
                className="h-4 w-4 accent-violet-700"
              />
              Show circular profile preview
            </label>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              The circular option changes only the preview. The downloaded file
              stays square or rectangular, which is generally suitable for profile uploads.
            </p>

            <button
              type="button"
              onClick={downloadImage}
              disabled={!ready}
              className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Download resized image
            </button>

            <div className="mt-5 rounded-xl bg-violet-50 p-4 text-sm leading-6 text-violet-950">
              <strong>Privacy:</strong> Your image is processed in your browser
              and is not sent to FreeTools Hub's server by this tool.
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold">How to resize a profile picture</h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-600">
            <li>Choose a photo from your device.</li>
            <li>Select a preset size or enter your own width and height.</li>
            <li>Click “Resize image” to create the preview.</li>
            <li>Choose PNG or JPEG and download your resized image.</li>
          </ol>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Suggested dimensions are convenient square export sizes, not a guarantee
            of each platform&apos;s latest requirements. Check the platform&apos;s
            current image guidelines if exact dimensions matter.
          </p>
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          <a href="/" className="font-medium text-violet-700 hover:underline">
            Explore more free tools
          </a>
          <p className="mt-2">© 2026 FreeTools Hub</p>
        </footer>
      </div>
    </main>
  );
}
