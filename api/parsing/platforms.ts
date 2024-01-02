type PlatformFields = {
  line?: string;
  ns3StopPointRef?: string;
  ns3StopName?: string;
  nameLine?: string;
};

class Platform {
  public datasetId: string;
  public recordId: string;
  public fields: PlatformFields;

  constructor(platform: Record<string, any>) {
    this.datasetId = platform['datasetid'];
    this.recordId = platform['recordid'];
    this.fields = {
      line: platform.fields?.line,
      ns3StopPointRef: platform.fields?.ns3_stoppointref,
      ns3StopName: platform.fields?.ns3_stopname,
      nameLine: platform.fields?.name_line
    };
  }
}

class Platforms extends Array<Platform> {
  init(data: Record<string, any>[]) {
    for (const entry of data) {
      this.push(new Platform(entry));
    }
    return this;
  }

  getFromDatasetId(datasetId: string): Platform[] | null {
    const matches = this.filter((platform: Platform) => platform.datasetId === datasetId);
    return matches ?? null;
  }

  getFromRecordId(recordId: string): Platform[] | null {
    const matches = this.filter((platform: Platform) => platform.recordId === recordId);
    return matches ?? null;
  }

  getFromLine(line: string): Platform[] | null {
    const matches = this.filter((platform: Platform) => platform.fields?.line === line);
    return matches ?? null;
  }

  getFromNS3StopPointRef(ns3StopPointRef: string): Platform[] | null {
    const matches = this.filter(
      (platform: Platform) => platform.fields?.ns3StopPointRef === ns3StopPointRef
    );
    return matches ?? null;
  }

  getFromNS3StopName(ns3StopName: string): Platform[] | null {
    const matches = this.filter(
      (platform: Platform) => platform.fields?.ns3StopName === ns3StopName
    );
    return matches ?? null;
  }
}

export { Platform, Platforms, PlatformFields };
