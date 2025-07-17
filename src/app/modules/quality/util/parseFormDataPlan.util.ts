export const parseFormDataPlan = <T>(obj: T): FormData => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (key === 'meetings' && Array.isArray(value)) {
        value.forEach((meeting, index) => {
          Object.entries(meeting).forEach(([property, val]) => {
            if (property === 'help_file') {
              formData.append(`meetings[${index}][${property}]`, val as Blob);
            } else {
              formData.append(`meetings[${index}][${property}]`, val as string);
            }
          });
        });
      } else {
        formData.append(key, value as string | Blob);
      }
    });
  
    return formData;
  }