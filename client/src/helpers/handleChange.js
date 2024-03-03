export const handleChange = (e, setValue) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
        ...prevValue,
        [name]: value,
    }));
};
