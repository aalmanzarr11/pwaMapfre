import { InspectionData } from "./inspectionsData.dto";

export class InspectionsDataResponse{
  status: boolean;
  data: InspectionData; 
  responseData:InspectionData;
  error: string;
  constructor(status?: boolean, data?: InspectionData, responseData?: InspectionData,error?:string) {
     this.status = status;
     this.data = data; 
     this.responseData = responseData; 
     this.error=error;
  }
} 
