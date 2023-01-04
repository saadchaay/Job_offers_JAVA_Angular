package com.myrh.controllers;

import com.myrh.dto.OfferRequest;
import com.myrh.models.Offer;
import com.myrh.services.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("offers")
public class OfferController {

    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping()
    public ResponseEntity<Object> allOffers(){
        return ResponseEntity.ok(offerService.listAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Object> showOffer(@PathVariable String id){
        return ResponseEntity.ok(offerService.getOfferById(Long.valueOf(id)));
    }

    @PostMapping("save")
    public ResponseEntity<Object> saveOffer(
            @RequestBody OfferRequest req
    ){
        Offer offer = new Offer(req.getTitle(),
                req.getDescription(), req.getLocation(), req.getDegree(),
                req.getSalary(), Long.valueOf(req.getProfileId()), Long.valueOf(req.getCompanyId()));
        if(offerService.save(offer) != null)
            return ResponseEntity.ok("success");
        else return ResponseEntity.status(400).body("Failed");
    }

    @GetMapping("company/{id}")
    public ResponseEntity<Object> allOffersByCompany(@PathVariable String id){
        return ResponseEntity.ok(offerService.getOffersByCompany(Long.valueOf(id)));
    }


}
