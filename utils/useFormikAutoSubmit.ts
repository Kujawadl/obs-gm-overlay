import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "./useDebouncedCallback";
import type { FormikProps } from "formik";

export function useFormikAutoSubmit<T>(
	formik: FormikProps<T>,
	submitDebounce: number = 200,
) {
	const [lastValues, setLastValues] = useState<T>(formik.values);
	const submitForm = useDebouncedCallback(
		formik.submitForm.bind(formik),
		submitDebounce,
	);
	useEffect(() => {
		const valuesChanged = !isEqual(lastValues, formik.values);
		if (valuesChanged) {
			setLastValues(formik.values);
			if (formik.touched && formik.isValid) {
				submitForm();
			}
		}
	}, [lastValues, formik.values, formik.touched, formik.isValid, submitForm]);
}
