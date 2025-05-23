function RequestInfo({ data }) {
  return (
    <div className="flex flex-col bg-[var(--primary)] p-4 gap-3 max-w-[600px] max-h-[500px] rounded-sm">
      <div className="h3">Інформація про заявку</div>
      <div className="flex flex-col gap-3">
        <div>
          <span className="h4">Ім’я та Прізвище: </span>
          {data.slp}
        </div>
        <div>
          <span className="h4">Телефон: </span>
          {data.phoneNumber}
        </div>
        <div>
          <span className="h4">Місцезнаходження: </span>
          {data.region + ", " + data.town}
        </div>
        <div>
          <span className="h4">Тип допомоги: </span>
          {data.directionOfAssistance}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="h4 text-nowrap">Опис допомоги: </span>
          <div className="max-h-[200px] overflow-y-auto">
            {data.descriptionOfAid}
          </div>
        </div>
        {data.additionalInformation && (
          <div>
            <span className="h4">Додаткові деталі: </span>
            {data.additionalInformation}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestInfo;
