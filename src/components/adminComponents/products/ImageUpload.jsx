"use Client"

//file in encoded to base64 and saved it as a url in local storage to use in different pages in local machine
// Here in this file upload, i have not sent and saved image in backend, instead i used fileReader api and saved imagee on local storage, seleted them and created url of them, and passed that url to the backend, which makes the file uploading work only on my local machine.
// : Added a readFileAsDataURL function that reads the file as a data URL (base64 encoded string).
//  Modified the handleDragAndDropProductPicturesChange and handleDragAndDropProductPicturesDrop functions to store the base64 URLs. The component now loads these URLs from local storage when it mounts and saves the updated URLs back to local storage whenever fileUrls changes.
// Added two useEffect hooks: one for loading the images from local storage when the component mounts, and another for saving the images to local storage whenever the fileUrls state changes.
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Image from 'next/image';
import { Label } from "@/components/ui/label";
import DragAndDropIcon from '@/../../public/assets/images/dragAndDrop.png'; // Adjust the import path accordingly

const ImageUpload = ({ formik, forUpdateModal }) => {
  const [dragAndDropProductPictures, setDragAndDropProductPictures] = React.useState([]);
  const [fileUrls, setFileUrls] = React.useState(forUpdateModal || []);

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleDragAndDropProductPicturesChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newFiles = Array.from(files);
      const urls = await Promise.all(newFiles.map((file) => readFileAsDataURL(file)));
      setDragAndDropProductPictures((prevFiles) => [...prevFiles, ...newFiles]);
      setFileUrls((prevUrls) => [...prevUrls, ...urls]);
    }
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...dragAndDropProductPictures];
    const updatedUrls = [...fileUrls];
    updatedFiles.splice(index, 1);
    updatedUrls.splice(index, 1);
    setDragAndDropProductPictures(updatedFiles);
    setFileUrls(updatedUrls);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragAndDropProductPicturesDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const newFiles = Array.from(files);
      const urls = await Promise.all(newFiles.map((file) => readFileAsDataURL(file)));
      setDragAndDropProductPictures((prevFiles) => [...prevFiles, ...newFiles]);
      setFileUrls((prevUrls) => [...prevUrls, ...urls]);
    }
  };

  React.useEffect(() => {
    formik.setFieldValue('image', fileUrls);
  }, [fileUrls]);

  React.useEffect(() => {
    // Load images from local storage on component mount
    const savedImages = JSON.parse(localStorage.getItem('savedImages') || '[]');
    setFileUrls(savedImages);
  }, []);

  React.useEffect(() => {
    // Save images to local storage when fileUrls state changes
    localStorage.setItem('savedImages', JSON.stringify(fileUrls));
  }, [fileUrls]);

  return (
    <div className="mt-5">
      <div className="font-medium text-orange-600 border-b border-b-slate-400/70 pb-2">Upload</div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDragAndDropProductPicturesDrop}
        className="mt-2 border border-solid border-black rounded-[5px] h-40 flex items-center justify-center relative"
      >
        <input
          type="file"
          id="dragAndDropProductPicturesFiles"
          accept="image/*"
          onChange={handleDragAndDropProductPicturesChange}
          className="hidden"
        />
        <div className="relative h-full w-full">
          <Image
            src={DragAndDropIcon}
            alt="uploaded"
            className="opacity-60 object-contain"
            fill
          />
        </div>

        <Label
          htmlFor="dragAndDropProductPicturesFiles"
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer opacity-0"
        >
          Change
        </Label>
      </div>

      {fileUrls.length > 0 ? (
        <div>
          <p className="mt-3 text-gray-500 text-sm">Selected Files:</p>
          {fileUrls.map((url, index) => (
            <div
              key={index}
              className="py-2 mt-2 px-3 border rounded-lg flex items-center"
            >
              <span className="mr-3 text-sm">{index + 1}.</span>
              <img
                src={url}
                alt="File"
                className="w-12 h-12 object-cover"
              />
              <div className="flex-1 ml-3">
                <p className="text-sm">{dragAndDropProductPictures[index]?.name}</p>
                <p className="text-xs text-gray-600">
                  {Math.round(dragAndDropProductPictures[index]?.size / 1024)} KB
                </p>
              </div>
              <AiOutlineCloseCircle
                className="text-red-600 cursor-pointer"
                onClick={() => handleFileDelete(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm">No files selected</div>
      )}
    </div>
  );
};

export default ImageUpload;


//  *********Use this when there is a server which accepts a file*********




// import React from 'react';
// import { AiOutlineCloseCircle } from "react-icons/ai";
// import DragAndDropIcon from "@/../../public/assets/images/dragAndDrop.png";
// import Image from "next/image";
// import { Label } from "@/components/ui/label";

// const ImageUpload = ({ formik }) => {
//   const [dragAndDropProductPictures, setDragAndDropProductPictures] = React.useState([]);

//   const handleDragAndDropProductPicturesChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       const newFiles = Array.from(files);
//       setDragAndDropProductPictures((prevFiles) => [...prevFiles, ...newFiles])
//     }
//   };

//   const handleFileDelete = (index) => {
//     const updatedFiles = [...dragAndDropProductPictures];
//     updatedFiles.splice(index, 1);
//     setDragAndDropProductPictures(updatedFiles);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDragAndDropProductPicturesDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     if (files.length > 0) {
//       const newFiles = Array.from(files);
//       setDragAndDropProductPictures((prevFiles) => [...prevFiles, ...newFiles]);
//     }
//   };

//   React.useEffect(() => {
//     formik.setFieldValue('image', dragAndDropProductPictures);
//   }, [dragAndDropProductPictures]);

//   return (
//     <div className="mt-5">
//       <div className="font-medium text-orange-600 border-b border-b-slate-400/70 pb-2">Upload</div>
//       <div
//         onDragOver={handleDragOver}
//         onDrop={handleDragAndDropProductPicturesDrop}
//         className="mt-2 border border-solid border-black rounded-[5px] h-40 flex items-center justify-center relative"
//       >
//         <input
//           type="file"
//           id="dragAndDropProductPicturesFiles"
//           accept="image/*"
//           onChange={handleDragAndDropProductPicturesChange}
//           className="hidden"
//         />
//         <div className="relative h-full w-full">
//           <Image
//             src={DragAndDropIcon}
//             alt="uploaded"
//             className="opacity-60 object-contain"
//             fill
//           />
//         </div>

//         <Label
//           htmlFor="dragAndDropProductPicturesFiles"
//           className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer opacity-0"
//         >
//           Change
//         </Label>
//       </div>

//       {dragAndDropProductPictures.length > 0 ? (
//         <div>
//           <p className="mt-3 text-gray-500 text-sm">Selected Files:</p>
//           {dragAndDropProductPictures.map((url, index) => (
//             <div
//               key={index}
//               className="py-2 mt-2 px-3 border rounded-lg flex items-center"
//             >
//               <span className="mr-3 text-sm">{index + 1}.</span>
//               <img
//                 src={url}
//                 alt="File"
//                 className="w-12 h-12 object-cover"
//               />
//               <div className="flex-1 ml-3">
//                 <p className="text-sm">{dragAndDropProductPictures[index].name}</p>
//                 <p className="text-xs text-gray-600">
//                   {Math.round(dragAndDropProductPictures[index].size / 1024)} KB
//                 </p>
//               </div>
//               <AiOutlineCloseCircle
//                 className="text-red-600 cursor-pointer"
//                 onClick={() => handleFileDelete(index)}
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-gray-500 text-sm">No files selected</div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
