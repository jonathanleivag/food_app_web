export const updateCloudinaryImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const deleteCloudinaryImage = async (
  secure_url: string
): Promise<string> => {
  try {
    const response = await fetch("/api/cloudinary/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secure_url }),
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
