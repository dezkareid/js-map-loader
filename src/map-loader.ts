/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Loader, LoaderOptions} from '@googlemaps/loader';


export interface MapLoaderOptions {
  apiKey: string,
  divId: string,
  mapOptions: google.maps.MapOptions,
  apiOptions?: MapsJSAPIOptions,
  append?: boolean
}

export interface MapsJSAPIOptions extends Omit<LoaderOptions, 'apiKey'> {}

export class GoogleMap {
  constructor() {
  }

  async initMap(options: MapLoaderOptions): Promise<google.maps.Map<Element>> {
    await this.loadJsApi(options);
    // Get the div to load the map into
    let map_div: Element = document.getElementById(options.divId);
    if (options.append) {
      map_div = this.appendMapDiv(map_div);
    }
    // Initialize the map
    return await new google.maps.Map(map_div, options.mapOptions);
  }

  private appendMapDiv(map_div: Element) {
    let append_div_id: string = 'google_map_appended';
    let append_div: Element = document.createElement('div');
    append_div.setAttribute('id', append_div_id);
    map_div.appendChild(append_div);
    return append_div;
  }

  private async loadJsApi(options: MapLoaderOptions): Promise<void> {
    if (!options.apiOptions) {
      options.apiOptions = {};
    }
    const loader_options: LoaderOptions =
      Object.assign(options.apiOptions, {apiKey: options.apiKey});

    const loader: Loader = new Loader(loader_options);
    // Load the Maps JS API
    return await loader.load();
  }
}
