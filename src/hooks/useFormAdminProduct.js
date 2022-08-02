import { useState } from "react";

export default function useFormAdminProduct(baseData, action, reset, baseSize) {
  const [formData, setFormData] = useState(baseData);
  const [errorMsg, setErrorMsg] = useState("");
  const [formSize, setFormSize] = useState(baseSize)

  const handleChange = (event) => {
    const { name, value, type} = event.target;
    if (type === 'file') {
      // setFormData({ ...formData, [name]: `/${event.target.files[0].name}` })
      if (event.target.files.length) {
        setFormData({ ...formData, [name]: `/${event.target.files[0].name}` })
      } else {
        setFormData({ ...formData, [name]: "" })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  };

  const handleCheckBoxChange = (event) => {
    setFormData({ ...formData, disp: !formData.disp });
  }

  const handleChangeBarcode = (event) => {
    const { id, name, value} = event.target;
    formSize[id][name] = event.target.value.trim();
    setFormSize([...formSize])
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validSizes = formSize.filter(row => row.barcode !== "");

    const barcodesArray = validSizes.map(row => row.barcode);
    const duplicates = barcodesArray.filter((barcode, index) => index !== barcodesArray.indexOf(barcode));
    // console.log(duplicates);
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(formData.price)) {
      setErrorMsg("Input valid price, with max 2 digits after decimal point")
      // setFormData({...formData, price: ""});
      } else if (duplicates.length) {
        setErrorMsg("There is Duplication in barcodes")
      } else if (!formData.id && validSizes.length === 0) {
        setErrorMsg("You have to add atleast one size with it's barcode")
      } else {
      setErrorMsg("");
      action(formData, validSizes);
      reset();
    };
  }

  return { formData, handleChange, handleSubmit, handleCheckBoxChange, errorMsg, formSize, handleChangeBarcode };
}