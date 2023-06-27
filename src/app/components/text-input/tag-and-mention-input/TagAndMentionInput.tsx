'use client'

import autosize from '@/app/utils/autosize';
import { User } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { Mention, MentionItem, MentionsInput, OnChangeHandlerFunc, SuggestionDataItem } from 'react-mentions'

import Avatar from '../../user/Avatar/Avatar';
import mentionsInputStyle from './mentionsInputStyle';
import styles from './TagAndMentionInput.module.scss';

type SetCustomValue = (id: string, value: any) => void;


interface ExtendedSuggestionDataItem extends SuggestionDataItem {
 avatar?: string;
 name?: string;
 isVerified?: boolean;
}


type Props = {
 setCustomValue: SetCustomValue
 body: string;
 users: User[]
 placeholder: string;

}

const TagAndMentionInput: React.FC<Props> = ({ setCustomValue, body, users, placeholder }) => {

 const textAreaRef = useRef<HTMLTextAreaElement>(null);

 const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([])


 const handleTextareaChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>
 ) => {
  const inputValue = event.target.value;
  if (inputValue.length <= 500) {
   setCustomValue('postBody', inputValue);
  } else {
   setCustomValue('postBody', inputValue.slice(0, 500));
  }
 };

 useEffect(() => {
  // Transform the usernames into SuggestionDataItem objects
  const userSuggestions: ExtendedSuggestionDataItem[] = (users ?? []).map((user) => ({
   id: user.id,
   display: user.username,
   avatar: user.photo as string,
   name: user.name,
   isVerified: user.isVerified
  }));

  setSuggestions(userSuggestions ?? []);
 }, [users]);


 useEffect(() => {
  const textarea = textAreaRef.current;

  const autosizeHandler = () => {
   autosize(textAreaRef);
  };

  if (textarea) {
   textarea.addEventListener('keydown', autosizeHandler);
  }

  return () => {
   if (textarea) {
    textarea.removeEventListener('keydown', autosizeHandler);
   }
  };
 }, []);


 const handleOnChange = (
  event: { target: { value: string } },
  newValue: string,
  newPlainTextValue: string,
  mentions: MentionItem[]
 ) => {
  let value = event.target.value;
  value = value.replace(/\@\[(\w+)\]\(\w+\)/g, '@$1');
  setCustomValue('postBody', value);
 };

 const handleOnAdd = (id: string | number, display: string) => {
  const mentionText = `@${display}`;
  const newText = body.replace(/@(\w+)?$/, mentionText);
  body = newText
 }

 return (
  <MentionsInput
   value={body}
   placeholder={placeholder}
   onChange={(event, newValue, newPlainTextValue, mentions) => {
    handleOnChange(event, newValue, newPlainTextValue, mentions);
   }}
   style={mentionsInputStyle}
   inputRef={textAreaRef}
   rows={1}
   className={styles.textarea}
   allowSuggestionsAboveCursor={true}
   a11ySuggestionsListLabel={"Suggested mentions"}
  >
   <Mention
    trigger="@"
    onAdd={handleOnAdd}
    data={suggestions}
    appendSpaceOnAdd
    className={styles.mention}
    displayTransform={(_, display) => `@${display}`}
    renderSuggestion={(data: ExtendedSuggestionDataItem) => (
     <div className={styles.suggestionBox}>
      <Avatar photo={data.avatar || '/images/placeholder.png'} />
      <div className={styles.displayName}>
       <span>{data.name}</span>
       <span>@{data.display}</span>
      </div>

     </div>
    )}
   />

  </MentionsInput>
 );
}

export default TagAndMentionInput;
