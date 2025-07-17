export const parseFormData = <T>(obj: T): FormData => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (key === 'multiple_file' && Array.isArray(value)) {
      value.forEach((obj, index) => {
        Object.entries(obj).forEach(([propiedad, val]) => {
          formData.append(`multiple_file[${index}][${propiedad}]`, val as string | Blob);
        });
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
} 