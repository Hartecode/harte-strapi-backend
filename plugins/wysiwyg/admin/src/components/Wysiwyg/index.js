import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Button } from '@buffetjs/core';
import { Label, InputDescription, InputErrors } from 'strapi-helper-plugin';
import Editor from '../CKEditor';
import MediaLib from '../MediaLib';

const imgSizes = [
  { size: 'xsmall', bp: 400 },
  { size: 'small', bp: 768 },
  { size: 'medium', bp: 1023 },
  { size: 'large', bp: 1440 },
]

const srcSet = (format) => {
  return imgSizes.reduce((acc, cur) => {
    return `${acc}${acc ? ', ' :''}${format[cur.size].url} ${cur.bp}`
  }, '')
}



const Wysiwyg = ({
  inputDescription,
  errors,
  label,
  name,
  noErrorsDescription,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let spacer = !isEmpty(inputDescription) ? <div style={{ height: '.4rem' }} /> : <div />;

  if (!noErrorsDescription && !isEmpty(errors)) {
    spacer = <div />;
  }

  const handleChange = data => {
    if (data.mime.includes('image')) {
      const imgTag = `<img src="${data.url}" srcset="${srcSet(data.formats)}" caption="${data.caption}" alt="${data.alternativeText}" loading="lazy"></img>`;
      const newValue = value ? `${value}${imgTag}` : imgTag;
      onChange({ target: { name, value: newValue } });
    }

    // Handle videos and other type of files by adding some code
  };

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <div
      style={{
        marginBottom: '1.6rem',
        fontSize: '1.3rem',
        fontFamily: 'Lato',
      }}
    >
      <Label htmlFor={name} message={label} style={{ marginBottom: 10 }} />
      <div style={{
        marginBottom: '1rem'
      }}>
        <Button color="primary" onClick={handleToggle}>
          MediaLib
        </Button>
      </div>
      <Editor name={name} onChange={onChange} value={value} />
      <InputDescription
        message={inputDescription}
        style={!isEmpty(inputDescription) ? { marginTop: '1.4rem' } : {}}
      />
      <InputErrors errors={(!noErrorsDescription && errors) || []} name={name} />
      {spacer}
      <MediaLib onToggle={handleToggle} isOpen={isOpen} onChange={handleChange} />
    </div>
  );
};

Wysiwyg.defaultProps = {
  errors: [],
  inputDescription: null,
  label: '',
  noErrorsDescription: false,
  value: '',
};

Wysiwyg.propTypes = {
  errors: PropTypes.array,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Wysiwyg;