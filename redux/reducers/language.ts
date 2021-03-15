import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Language from "../../enums/Language";

type LanguageProp = {
    CurrentLanguage: Language
}

const initialState: LanguageProp = {
    CurrentLanguage: Language.En
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => ({ ...state, CurrentLanguage: action.payload })
    }
})

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
