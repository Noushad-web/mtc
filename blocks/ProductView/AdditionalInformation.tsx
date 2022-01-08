import { LoadingDots } from '@components/ui';
import React, { useEffect, useState } from 'react'

const AdditionalInformation = ({ description }: { description: string }) => {
  const [string, setString] = useState<string>('');

  const pattern = /specification:/ig; // REGEX

  useEffect(()=> {    

    let substring = description.substring(
          description.search(pattern),
          description.length)

    substring = substring.replace(pattern, '<h3 class="specification-heading">Specification</h3>');

    setString(substring)

  }, [description])

  return (
    <>
      {string ? (
        <div
          className="tabPanelItem__description tabPanelItem__description--para"
          dangerouslySetInnerHTML={{
            __html: string,
          }}
        ></div>
      ) : (
        <LoadingDots />
      )}
    </>
  )
}

export default AdditionalInformation
